using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class CreaEntidadParaRelacionNaN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendaServiciosDelProfesional_Agendas_AgendasId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropForeignKey(
                name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServiciosId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AgendaServiciosDelProfesional",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.RenameColumn(
                name: "ServiciosId",
                table: "AgendaServiciosDelProfesional",
                newName: "ServicioDelProfesionalId");

            migrationBuilder.RenameColumn(
                name: "AgendasId",
                table: "AgendaServiciosDelProfesional",
                newName: "AgendaId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendaServiciosDelProfesional_ServiciosId",
                table: "AgendaServiciosDelProfesional",
                newName: "IX_AgendaServiciosDelProfesional_ServicioDelProfesionalId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "AgendaServiciosDelProfesional",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AgendaServiciosDelProfesional",
                table: "AgendaServiciosDelProfesional",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AgendaServiciosDelProfesional_AgendaId",
                table: "AgendaServiciosDelProfesional",
                column: "AgendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaServiciosDelProfesional_Agendas_AgendaId",
                table: "AgendaServiciosDelProfesional",
                column: "AgendaId",
                principalTable: "Agendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional",
                column: "ServicioDelProfesionalId",
                principalTable: "ServiciosDelProfesional",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendaServiciosDelProfesional_Agendas_AgendaId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropForeignKey(
                name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AgendaServiciosDelProfesional",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropIndex(
                name: "IX_AgendaServiciosDelProfesional_AgendaId",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AgendaServiciosDelProfesional");

            migrationBuilder.RenameColumn(
                name: "ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional",
                newName: "ServiciosId");

            migrationBuilder.RenameColumn(
                name: "AgendaId",
                table: "AgendaServiciosDelProfesional",
                newName: "AgendasId");

            migrationBuilder.RenameIndex(
                name: "IX_AgendaServiciosDelProfesional_ServicioDelProfesionalId",
                table: "AgendaServiciosDelProfesional",
                newName: "IX_AgendaServiciosDelProfesional_ServiciosId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AgendaServiciosDelProfesional",
                table: "AgendaServiciosDelProfesional",
                columns: new[] { "AgendasId", "ServiciosId" });

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaServiciosDelProfesional_Agendas_AgendasId",
                table: "AgendaServiciosDelProfesional",
                column: "AgendasId",
                principalTable: "Agendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendaServiciosDelProfesional_ServiciosDelProfesional_ServiciosId",
                table: "AgendaServiciosDelProfesional",
                column: "ServiciosId",
                principalTable: "ServiciosDelProfesional",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
